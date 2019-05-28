import BCRYPT from 'bcrypt';
import MONGOOSE from 'mongoose';

type comparePasswordFunction = (candidatePassword: string) => Promise<boolean>;
type toNormalizationFunction = () => UserType;

export type UserDocument = MONGOOSE.Document & {
  email: string,
  first_name: string,
  last_name: string,
  password: string,
  comparePassword: comparePasswordFunction,
  toNormalization: toNormalizationFunction
};

export type UserType = {
  id: string | null,
  email: string | null,
  first_name: string | null,
  last_name: string | null
};

const userSchema = new MONGOOSE.Schema({
  email: { type: String, unique: true },
  first_name: { type: String, default: '' },
  last_name: { type: String, default: ''},
  password: String
}, { timestamps: true });

userSchema.pre('save', function save(next: Function) {
  const ctx = this;
  
  if (!this.isModified('password')) { return next(); }

  BCRYPT.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    BCRYPT.hash(this.get('password'), salt, (err: MONGOOSE.Error, hash: string) => {
      if (err) { return next(err); }
      ctx.set('password', hash);
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function (candidatePassword: string) {
  const ctx = this;
  return new Promise ((resolve, reject) => {
    BCRYPT.compare(candidatePassword, ctx.get('password'), (err: MONGOOSE.Error, isMatch: boolean) => {
      if (err) reject(err);
      else resolve(isMatch);
    });
  });
};

const toNormalization: toNormalizationFunction = function () {
  let _userObject: UserDocument = this.toObject();

  let UserObject: UserType = {
    id: _userObject._id.toString(),
    first_name: _userObject.first_name,
    last_name: _userObject.last_name,
    email: _userObject.email
  };

  return UserObject;
};

userSchema.methods.comparePassword = comparePassword;
userSchema.methods.toNormalization = toNormalization;

const User = MONGOOSE.model<UserDocument>('User', userSchema);

export default User;