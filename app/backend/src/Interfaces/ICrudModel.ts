export interface ICrudModelCreator<T> {
  create(data: Partial<T>): Promise<T | null>;
}

export interface ICrudModelReader<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
}

export interface ICrudModelLogin<T> {
  findByEmail(email: string): Promise<T | null>;
  findRole(id: number): Promise<T | null>;
}

export interface ICrudModelUpdater<T> {
  update(id: number, data: Partial<T>): Promise<T | null>;
}

export interface ICrudModelDeleter {
  delete(id: number): Promise<number>;
}

export interface ICrudModel<T> extends
  ICrudModelCreator<T>,
  ICrudModelReader<T>,
  ICrudModelUpdater<T>,
  ICrudModelDeleter { }
