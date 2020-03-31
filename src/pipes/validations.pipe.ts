import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidationOptions, ValidationArguments, registerDecorator } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {

            const constraints = errors.map(m => m.constraints);
            if (constraints.length > 0) {
                const constrain = constraints[0];
                const message = Object.keys(constrain).map(key => constrain[key]);
                if (message.length > 0) {
                    throw new BadRequestException(message[message.length - 1])
                }

                throw new BadRequestException(message);
            }

            throw new BadRequestException('Validation faild.');
        }
        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

}

export function IsComparePassword(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {

        if (validationOptions == undefined) {
            validationOptions = {};
            validationOptions.message = 'password and comfirm do not match'
        }
        registerDecorator({
            name: "IsComparePassword",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {


                    return args.object[property] === value;
                }
            }
        });
    };
}