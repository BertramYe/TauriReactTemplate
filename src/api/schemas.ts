import { string, object,number,email, enum as enum_,type ZodNumber,type ZodString ,type ZodEnum,type ZodOptional,type ZodEmail } from "zod";


type TSchema = ReturnType <typeof object>

const TokenValidSchema = object({
  api_token: string("Invalid Token !").trim().min(6,"Invalid Token !")
                    // .max(6, "Invalid verification_code !"),
});

const UserKeysList = [
  'username','email','age','gender'
] as const;

type TContactKeysList = typeof UserKeysList[number];

const UserProfileSchema = object<Record<TContactKeysList, any>>(
    UserKeysList.reduce((acc, key) => {
    if (key == 'age') {
        acc[key] = number('age is invalid !').min(1, `${key} is required !`);
    } else if (key == 'gender') {
        acc[key] = enum_(['man', 'female'], { error: `Invalid ${key} , and it can only be one of 'man' or 'female' !`});
    } else if(key == 'email') { 
        acc[key] = email({ error: (iss) => `Invalid email: ${iss.input}` });
    } else {
        acc[key] = string(`no ${key} inform !`).optional()
    }
    return acc;
    }, {} as Record<TContactKeysList,ZodEmail | ZodNumber | ZodString | ZodEnum | ZodOptional<ZodString>> )
);


export {
    type TSchema,
    type TContactKeysList,
    UserProfileSchema,
    TokenValidSchema
}