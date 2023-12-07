export interface ICrudModelCreator<T> {
  create(data: Partial<T>): Promise<T | null>;
}

export interface ICrudModelReader<T> {
  findAll(): Promise<T[]>;
}

export interface ICrudModelReaderById<T> {
  findById(id: number): Promise<T | undefined>;
}

export interface ICrudModelLogin<T> {
  findByEmail(email: string): Promise<T | null>;
  findRole(id: number): Promise<T | null>;
}

export interface ICrudModelUpdater<T> {
  update(id: number, data: Partial<T>): Promise<T | null>;
}

export interface ICrudModelMatchesInProgress<T> {
  findInProgress(data: boolean): Promise<T[]>;
}

export interface ICrudModelDeleter {
  delete(id: number): Promise<number>;
}

export interface ICrudModel<T> extends
  ICrudModelCreator<T>,
  ICrudModelReader<T>,
  ICrudModelUpdater<T>,
  ICrudModelReaderById<T>,
  ICrudModelDeleter { }

export interface ICrudMatches<T> extends ICrudModelReader<T>, ICrudModelMatchesInProgress<T> {}
