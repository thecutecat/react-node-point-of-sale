import { mPatients } from "../../entity/mPatients";
import {
  Get,
  Post,
  Body,
  JsonController,
  Authorized,
  QueryParam,
  Param,
  Put,
  Delete
} from "routing-controllers";
import {
  PaginationInfo,
  IPaginationQueryParam
} from "../../decorators/PaginationInfo";
import { CrudServices, IFetchPageQuery } from "../../services/CrudServices";
import { CurrentUser } from "../../decorators/CurrentUser";

@JsonController("/mPatients")
@Authorized()
export class CustomersController {
  private crudServices: CrudServices<mPatients>;

  constructor() {
    this.crudServices = new CrudServices<mPatients>();
    this.crudServices.setEntity(mPatients);
  }

  @Get("/:id")
  public async getmPatientById(@Param("id") id: string): Promise<any> {
    const res = await this.crudServices.fetchById(id);
    return res || {};
  }

  @Get()
  public async getmPatients(
    @PaginationInfo() paginationInfo: IPaginationQueryParam,
    @QueryParam("q") search?: string
  ): Promise<mPatients[]> {
    const query: IFetchPageQuery = {
      search,
      perPage: paginationInfo.perPage,
      page: paginationInfo.pageNo
    };
    return await this.crudServices.fetchPages(query);
  }

  @Post()
  public async createNewmPatients(
    @Body() mPatients: mPatients,
    @CurrentUser() userid: string
  ): Promise<any> {
    return await this.crudServices.create(userid, mPatients);
  }

  @Put("/:id")
  public async updatemPatients(
    @Param("id") id: string,
    @Body() data: mPatients,
    @CurrentUser() userid: string
  ) {
    return await this.crudServices.updateById(userid, { id }, data);
  }

  @Delete("/:id")
  public async deletemPatients(@Param("id") id: string): Promise<any> {
    return await this.crudServices.deleteById(id);
  }
}
