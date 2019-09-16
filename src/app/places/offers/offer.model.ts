export class Offer {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
    public dateFrom: Date,
    public dateTo: Date,
    public userId: string,
    public imgUrl: string
  ) {}
}
