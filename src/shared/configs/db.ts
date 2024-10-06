import "./env";

export class DatabaseConfigs {
  static instance: DatabaseConfigs;

  private DATABASE_HOST = process.env.DATABASE_HOST;
  private DATABASE_PORT = parseInt(process.env.DATABASE_PORT, 10) || 5432;
  private DATABASE_USER = process.env.DATABASE_USER;
  private DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
  private DATABASE_NAME = process.env.DATABASE_NAME;

  private constructor() {}

  public static getInstance() {
    if (!DatabaseConfigs.instance) {
      DatabaseConfigs.instance = new DatabaseConfigs();
    }

    return DatabaseConfigs.instance;
  }

  setHost(host: string) {
    this.DATABASE_HOST = host;

    return DatabaseConfigs.instance;
  }

  setPort(port: number) {
    this.DATABASE_PORT = port;

    return DatabaseConfigs.instance;
  }

  setUser(user: string) {
    this.DATABASE_USER = user;

    return DatabaseConfigs.instance;
  }

  setPassword(password: string) {
    this.DATABASE_PASSWORD = password;

    return DatabaseConfigs.instance;
  }

  setName(name: string) {
    this.DATABASE_NAME = name;

    return DatabaseConfigs.instance;
  }

  getHost() {
    return this.DATABASE_HOST;
  }

  getPort() {
    return this.DATABASE_PORT;
  }

  getUser() {
    return this.DATABASE_USER;
  }

  getPassword() {
    return this.DATABASE_PASSWORD;
  }

  getName() {
    return this.DATABASE_NAME;
  }

  toString() {
    if (
      !this.DATABASE_HOST ||
      !this.DATABASE_PORT ||
      !this.DATABASE_USER ||
      !this.DATABASE_PASSWORD ||
      !this.DATABASE_NAME
    ) {
      throw new Error("Database configuration is not set");
    }

    const connectionString = `postgresql://${this.DATABASE_USER}:${this.DATABASE_PASSWORD}@${this.DATABASE_HOST}:${this.DATABASE_PORT}/${this.DATABASE_NAME}`;

    return connectionString;
  }
}

export const dbConfigs = DatabaseConfigs.getInstance();
