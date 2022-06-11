import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe("getAll",()=>{
    it('should return an array',()=>{
      const result= service.getAll();
      expect(result).toBeInstanceOf(Array); //result(getAll)가 array인지 테스트
    })
  })
  describe("getOne",()=>{
    it("should return a movie", ()=>{
      service.create({
        title: "테스트용",
        year: 2022,
        genres : ["테스트","성공적"]
      })
      const movie= service.getOne(1)
      expect(movie).toBeDefined(); // 위에서 만든 movie가 존재하는지
      expect(movie.id).toEqual(1); // 위에서 만든 movie의 아이디가 일치하는지
    });
    it("should throw 404 error", ()=>{ //  존재하지 않는 movieId에 에러가 생성되는지
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("해당 999의 영화는 존재하지 않습니다");
      }
    })
  })
});
