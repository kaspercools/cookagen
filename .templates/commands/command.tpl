    using FluentValidation;
    using FluentValidation.Results;
    using LegalRegister.Domain;
    using System;

    namespace LegalRegister.Commands
    {
        public class {{$CMD}}{{$ENTITY}}Command : ILegalRegisterCommand
        {
            public IValidator Validator { get; private set; }
            public {{$CMD}}{{$ENTITY}}Command(IValidator validator)
            {
                this.Validator = validator;
                this.Id = Guid.NewGuid();
            }

            public Guid Id { get; set; }

            public ValidationResult Validate()
            {
                return Validator?.Validate(new {{$ENTITY}}()
                {
                    Id = Id
                });
            }
        }
    }
