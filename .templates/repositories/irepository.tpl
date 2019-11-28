using System;
using LegalRegister.Domain;

namespace LegalRegister.Repositories
{
    public interface I{{$ENTITY | camelCase}}Repository: IBaseRepository<{{$ENTITY}}, Guid>
    {
        
    }   
}