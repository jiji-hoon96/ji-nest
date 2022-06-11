import { Controller, Get, Param ,Post,Delete, Put, Patch, Body, Query} from '@nestjs/common';
import { find } from 'rxjs';

@Controller('movies')
export class MoviesController {
    @Get()
    getAll(){
        return "This is Movies Controller"
    }
    @Get("find")
    find(@Query("country") searchCountry:string){
        return `찾고싶은 영화는 ${searchCountry}년 이후 영화입니다`
    }

    @Get(":id")
    getOne (@Param("id") movieId:string){
        return `This will return one movie => movie ID : ${movieId}`
    }

    @Post()
    create(@Body() movieData) {
        return movieData
    }

    @Delete(":id")
    remove(@Param("id") movieId:string){
        return `This will delete a movie => movie Id : ${movieId}`
    }

    @Patch(":id")
    patch(@Param("id") movieId:string, @Body() updateData){
        console.log(updateData)
        return {
            updateData: movieId,
            ...updateData
        }
    }
}
