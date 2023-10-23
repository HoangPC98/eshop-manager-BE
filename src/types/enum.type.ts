export enum UserInfoType {
  BasicInfo = 'basic_info',
  Profile = 'profile',
  Privacy = 'privacy',
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum EntityType {
  FriendShip = 'friendship',
  Post = 'posts',
  Reaction = 'reactions',
  Photo = 'photos',
  Comment = 'comments',
  User = 'users',
  Profile = 'profiles',
  Privacy = 'privacy',
}


export enum ReplyAddFrRequest {
  Accept = 'accept',
  Reject = 'reject',
}

export enum ReactionType {
  Like = 'like',
  Love = 'love',
  Haha = 'haha',
  Sad = 'sad',
  Angry = 'angry',
}

export enum FileType {
  ProfilePhoto = 'profilephoto',
  Avatar = 'avatar',
  CoverPhoto = 'coverphoto',
  PostPhoto = 'postphoto',
  Other = 'other',
}

export enum QueryOption {
  GetOne = 'get_one',
  GetMany = 'get_many',
  UseRepository = ' repository',
  UseQueryBuilder = 'queryBuilder',
}

export enum AuthType {
  FbOAuth = 'fb_oauth',
  GoogleOAuth = 'google_oauth',
  UsernamePasswordAuth = 'usrpsw_auth',
}

export enum UserStatus {
  Activated = 'activated',
  Unactivated = 'unactivated',
  Locked = 'locked',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum OtpType {
  VerifyEmailOrPhone = 'verify_email_phone',
  ForgotPassword = 'forgot_password',
  MfaAuthen = 'mfa_authen',
  WrongOtp = 'wrong_otp',
}

export enum BaseRoles {
  SuperAdmin = 'superadmin',
  UserGeneral = 'general_user',
  Vendor = 'vendor'
}

export enum DeliveryStatus {
  InCart = 'incart',
  PendingToConfirm = 'pending_to_confirm',
  InDelivering = 'in_delivering',
  SuccessDelivered = 'success_delivered',
  FailDelivered = 'fail_delivered',
  ReturnAndReFund = 'return_and_refund'
}

export enum PaymentStatus {
  UnPaid = 'unpaid',
  Paid = 'paid',
  Refund = 'refund'
}

export enum CurrencyUnit {
  Vnd = 'vnd',
  Dollar = 'dollar'
}

export enum PeriodFilter {
  Daily = 'daily',
  Weekly = 'weekly',
  Monthly = 'montly',
  Quarterly = 'quarterly',
  Yearly = 'yearly'
}

export enum ProductCondition {
  New= 'new',
  LikeNew = 'like_new',
  WarrantyExpired = 'warranty_expired'
}