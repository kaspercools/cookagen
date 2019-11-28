using System;
using LegalRegister.Domain;

namespace LegalRegister.Services
{
    public class {{$ENTITY}}Service : I{{$ENTITY}}Service
    {
        private readonly {{$ENTITY}}Repository _{{$ENTITY | camelCase}}Repository;

        public {{$ENTITY}}Service({{$ENTITY}}Repository {{$ENTITY | camelCase}}Repository)
        {
            _{{$ENTITY | camelCase}}Repository = {{$ENTITY | camelCase}}Repository;
        }

        public void Delete({{$KEY}} id)
        {
            throw new NotImplementedException();
        }

        public {{$ENTITY}} GetById({{$KEY}} id)
        {
            return _{{$ENTITY | camelCase}}Repository.Find(id);
        }

        public {{$ENTITY}} Add({{$ENTITY}} entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<{{$ENTITY}}> GetAll(){
            return _{{$ENTITY | camelCase}}Repository.FindAll(id);
        }
    }
}
