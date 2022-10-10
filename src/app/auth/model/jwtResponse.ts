export interface JwtResponse {
  token: string;
  expiration: Date;
  roles: string[];
}
