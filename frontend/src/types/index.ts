export interface Facility {
  id?: number;
  name: string;
  type: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  siteLeader?: string;
  imageUrl?: string;
}
