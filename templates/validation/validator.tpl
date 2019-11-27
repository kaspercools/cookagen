using FluentValidation;
using LegalRegister.Domain;

namespace LegalRegister.Validation.{{ENTITY | plural}}
{
    public class {{CMD}}{{ENTITY}}Validator : AbstractValidator<{{ENTITY}}>
    {
        public {{CMD}}{{ENTITY}}Validator()
        {
            RuleFor({{ENTITY | lowerCase}} => {{ENTITY | | lowerCase}}.Name).NotNull();
        }
    }
}
