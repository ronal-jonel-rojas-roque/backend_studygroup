import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, Min } from "class-validator";

export class PaginationUserDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    page: number;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    limit: number;
}   