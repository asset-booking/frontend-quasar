export interface IApiService<T> {
  create(item: T): Promise<T>
  update(src: T, target: T): Promise<boolean>
  delete(item: T): Promise<boolean>
  deleteById(id: number): Promise<boolean>
  getById(id: number): Promise<T | undefined>
  getAll(): Promise<T[]>;
}
