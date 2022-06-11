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
  describe('deleteOne',()=>{
    it("deletes a movie", ()=>{
      service.create({
        title:"테스트를 또해보자",
        year: 20222,
        genres:["테",'성'],
      })
      const beforeDelete= service.getAll().length;
      service.deleteOne(1)
      const afterDelete= service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    })
    it("should throw 404 error", ()=>{ //  존재하지 않는 movieId에 에러가 생성되는지
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
      })
  })
  describe('create',()=>{
    it("should create a movie",()=>{
      const beforeCreate = service.getAll().length;
      service.create({
        title:"테스트를 또해보자",
        year: 20222,
        genres:["테",'성'],
      })
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
  })
  describe("update",()=>{
    it("should update a movie", ()=>{
      service.create({
        title:"테스트를 또해보자",
        year: 20222,
        genres:["테",'성'],
      });
      service.update(1, {title :"바꾸자~"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('바꾸자~');
    })
    it("should throw a NotFoundExe", ()=>{ //  존재하지 않는 movieId에 에러가 생성되는지
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
      })
  })
});
