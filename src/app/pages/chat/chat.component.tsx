import React, { ChangeEvent, MouseEvent, Component } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import io from 'socket.io-client';
import { injectDependencies } from '../../hoc/inject-dependencies';
import { rootSelector } from '../../store/selectors';
import {
  ChatHasNewMessagesRequestAction,
  GetChatMessagesRequestAction,
} from '../../store/modules/chat-message/chat-message.actions';
import {
  ChatUserConnectedRequestAction,
  ChatUserDisconnectedRequestAction,
  GetChatUsersRequestAction,
} from '../../store/modules/chat-user/chat-user.actions';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import './chat.scss';

type Props = {
  currentUser: any;
  chatUsers: any[];
  chatMessages: any[];
  getChatUsersRequest: (data: any) => void;
  chatUserConnectedRequest: (data: any) => void;
  chatUserDisconnectedRequest: (data: any) => void;
  chatMessagesRequest: (data: any) => void;
  chatHasNewMessageRequest: (data: any) => void;
};
type State = Readonly<typeof initialState>;

const initialState = {
  message: '',
  usersTyping: [],
};

class ChatComponent extends Component<Props, State> {
  readonly state: State = initialState;
  socketIO: any;
  messages: any;
  typingTimer: any;

  componentDidMount(): void {
    const access_token = LocalStorageService.get('access_token');
    this.socketIO = io('http://localhost:3001', {
      query: { token: access_token },
      transports: ['websocket'],
    });

    // New user connected
    this.socketIO.on('user_connected', (data: any) => {
      this.props.chatUserConnectedRequest(data);
    });

    // User disconnected
    this.socketIO.on('user_disconnected', (data: any) => {
      this.props.chatUserDisconnectedRequest(data);
    });

    // Chat users list
    this.socketIO.on('users_list', (data: any) => {
      this.props.getChatUsersRequest(data);
    });

    // Chat has new message
    this.socketIO.on('has_new_message', (data: any) => {
      this.props.chatHasNewMessageRequest(data);
      this.scrollToBottom();
    });

    // Get messages list
    this.socketIO.on('messages_list', (data: any) => {
      this.props.chatMessagesRequest(data);
    });

    // User typing
    this.socketIO.on('user_with_id_typing', (user_id: number) => {
      const { usersTyping } = this.state;
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.setState({
          usersTyping: (usersTyping as any).filter((user: number) => {
            return user !== user_id;
          }),
        });
      }, 500);

      const newState = [...this.state.usersTyping, Number(user_id)];
      this.setState({
        usersTyping: Array.from(new Set(newState)),
      } as any);
    });

    setTimeout(() => this.scrollToBottom(), 200);
  }

  componentWillUnmount(): void {
    this.socketIO.disconnect();
  }

  /**
   * Scroll to the bottom of chat
   */
  scrollToBottom = (): void => {
    this.messages.scrollTop = this.messages.scrollHeight;
  };

  /**
   * Handle Input change
   *
   * @param ev
   */
  handleInputChange = (ev: ChangeEvent<HTMLTextAreaElement>): void => {
    const { currentUser } = this.props;
    return this.setState(
      {
        [ev.target.name as any]: ev.target.value,
      } as Pick<State, keyof State>,
      () => {
        this.socketIO.emit('user_typing', currentUser.id);
      }
    );
  };

  /**
   * Handle submit button click
   *
   * @param ev
   */
  handleSubmit = (ev: MouseEvent<HTMLButtonElement>): void => {
    this.socketIO.emit('send_new_message', this.state.message);

    return this.setState({
      message: '',
    } as Pick<State, keyof State>);
  };

  render() {
    const { message } = this.state;
    const { chatUsers, chatMessages } = this.props;

    return (
      <div>
        <h1 className="title is-h1">Chat</h1>

        <div className="chat-container">
          <div className="columns">
            <aside className="column">
              <nav className="panel chat-sidebar">
                <p className="panel-heading">Users online ({chatUsers.length})</p>
                {chatUsers.map((user) => {
                  return (
                    <div className="panel-block" key={user.id}>
                      {user.username}{' '}
                      {(this.state.usersTyping as any).includes(user.id) ? (
                        <span className="has-text-grey-light typing">Typing...</span>
                      ) : (
                        ''
                      )}
                    </div>
                  );
                })}
              </nav>
            </aside>

            <main className="column is-two-thirds is-relative">
              <div
                className="chat-messages"
                ref={(el) => {
                  this.messages = el;
                }}
              >
                {chatMessages.map((message) => {
                  return (
                    <div className="message" key={message.id}>
                      <article className="media">
                        <div className="media-content">
                          <div className="content">
                            <p>
                              <strong>{message.user.username}</strong>{' '}
                              <small>{new Date(message.created_at).toLocaleTimeString()}</small>
                              <br />
                              {message.text}
                            </p>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>

              <div className="new-message has-background-light">
                <div className="columns is-vcentered">
                  <div className="column is-four-fifths">
                    <div className="control is-expanded">
                      <textarea
                        name="message"
                        value={message}
                        rows={1}
                        onChange={this.handleInputChange}
                        className="textarea"
                      />
                    </div>
                  </div>

                  <div className="column">
                    <div className="control">
                      <button className="button is-info is-fullwidth" onClick={this.handleSubmit}>
                        Send message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export const Chat = injectDependencies({
  mapStateToProps: (state: import('../../store/root.reducer').AppState) => ({
    currentUser: rootSelector.getCurrentUser(state),
    chatMessages: rootSelector.getChatMessages(state),
    chatUsers: rootSelector.getChatUsers(state),
  }),
  mapDispatchToProps: (dispatch: Dispatch) =>
    bindActionCreators(
      {
        getChatUsersRequest: (users) => new GetChatUsersRequestAction(users),
        chatUserConnectedRequest: (user) => new ChatUserConnectedRequestAction(user),
        chatUserDisconnectedRequest: (user) => new ChatUserDisconnectedRequestAction(user),
        chatMessagesRequest: (messages) => new GetChatMessagesRequestAction(messages),
        chatHasNewMessageRequest: (messages) => new ChatHasNewMessagesRequestAction(messages),
      },
      dispatch
    ),
})(ChatComponent);
