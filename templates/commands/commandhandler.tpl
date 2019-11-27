using LegalRegister.Services;
using LegalRegister.Validation;

namespace LegalRegister.Commands
{
    public class {{CMD}}{{ENTITY}}CommandHandler : ICommandHandler<{{CMD}}{{ENTITY}}Command>
    {
        private readonly I{{ENTITY}}Service _{{ENTITY}}Service;

        public {{CMD}}{{ENTITY}}CommandHandler(I{{ENTITY}}Service {{ENTITY|camelCase}}Service)
        {
            _{{ENTITY|camelCase}}Service = {{ENTITY}}Service;
        }
        public void Handle({{CMD}}{{ENTITY}}Command {{CMD}}{{ENTITY}}Command)
        {
            var validationResult = {{CMD}}{{ENTITY}}Command.Validate();
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult);
            }

            var {{ENTITY|camelCase}}Mapper = new {{ENTITY}}Mapper();

            _{{ENTITY|camelCase}}Service.Add({{ENTITY}}Mapper.Map({{CMD}}{{ENTITY}}Command));
        }
    }
}
