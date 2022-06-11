import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './enitities/Movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];
    getAll() : Movie[] {
        return this.movies;
    }
    getOne(id:number): Movie {
        const movie= this.movies.find((movie)=>movie.id === id);
        if(!movie){
            throw new NotFoundException(`해당 ${id}의 영화는 존재하지 않습니다`)
        }
        return movie
    }
    deleteOne(id:number){
        this.getOne(id)
        this.movies = this.movies.filter((movie)=> movie.id !== id)
    }
    create(movieData:CreateMovieDto){
        this.movies.push({
            id: this.movies.length+1,
            ...movieData
        })
    }
    update(id:number, updateData){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData})
    }
}
