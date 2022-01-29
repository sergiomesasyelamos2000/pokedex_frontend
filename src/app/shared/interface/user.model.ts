/**
 * Interface for classes that represent a user.
 * @interface
 */
export interface User {
  email: string;
  name: string;
  password: string;
  type: string;
  ability: string;
  speed: string;
  weight: string;
  height: string;
  description: string;
  img: string;
}
