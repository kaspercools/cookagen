using System;
using System.Collections.Generic;


using LegalRegister.Domain;

namespace LegalRegister.Repositories
{
    public class {{$ENTITY}}Repository : I{{$ENTITY}}Repository
    {
        private readonly DbSet<{{$ENTITY}}> _{{$ENTITY | camelCase}}Set;

        public {{$ENTITY}}Repository(LegalRegisterDbContext dbContext){
            _{{$ENTITY | camelCase}}Set = dbContext.{{$ENTITY | plural}}Set;
        }
        
        public {{$ENTITY}} FindById(Guid id)
        {
            throw new NotImplementedException();
        }

        public ICollection<{{$ENTITY}}> FindAll()
        {
            throw new NotImplementedException();
        }
    }
}