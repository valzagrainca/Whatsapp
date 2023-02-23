export default class User {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public number: string,
    public status: string,
    public profile_picture: string
  ) {
    this.id=id,
    this.first_name,
    this.last_name,
    this.number=number,
    this.status=status,
    this.profile_picture=profile_picture
  }
}
