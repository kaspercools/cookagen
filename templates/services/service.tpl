using System;
using LegalRegister.Domain;

namespace LegalRegister.Services
{
    public class {{ENTITY}}Service : I{{ENTITY}}Service
    {
        private readonly {{ENTITY}}Repository _{(ENTITY | camelCase}};

        public {{ENTITY}}Service({{ENTITY}}Repository {(ENTITY | camelCase}})
        {
            _{(ENTITY | camelCase}} = {(ENTITY | camelCase}};
        }

        public void Delete({{KEY}} id)
        {
            throw new NotImplementedException();
        }

        public {{ENTITY}} GetById({{KEY}} id)
        {
            return _{(ENTITY | camelCase}}.Find(id);
        }

        public {{ENTITY}} Add({{ENTITY}} entity)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<{{ENTITY}}>> Add({{}})){
            return _{(ENTITY | camelCase}}.FindAll(id);
        }
    }
}
