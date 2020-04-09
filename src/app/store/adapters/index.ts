/**
 * Get ids
 *
 * @param state
 */
export function getIds(state: any): any[] {
  return state.ids;
}

/**
 * Get all entities
 *
 * @param state
 */
export function getAll(state: any): any {
  const { entities, ids } = state;

  return ids.map((id: number) => entities[id]);
}