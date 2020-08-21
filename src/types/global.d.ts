import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type FieldWrapper<T> = T;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IQuery = {
  placeholder?: Maybe<FieldWrapper<Scalars['Int']>>;
  me?: Maybe<FieldWrapper<IUser>>;
  getChannels: Array<FieldWrapper<IChannel>>;
  getChannelByID?: Maybe<FieldWrapper<IChannel>>;
};


export type IQueryGetChannelByIdArgs = {
  id: Scalars['String'];
};

export type ISubscription = {
  placeholder?: Maybe<FieldWrapper<Scalars['Int']>>;
};

export type IMutation = {
  placeholder?: Maybe<FieldWrapper<Scalars['Int']>>;
  createChannel?: Maybe<FieldWrapper<IChannel>>;
  favoriteChannel?: Maybe<FieldWrapper<IChannel>>;
  sendMessage?: Maybe<FieldWrapper<IMessage>>;
};


export type IMutationCreateChannelArgs = {
  input?: Maybe<ICreateChannelInput>;
};


export type IMutationFavoriteChannelArgs = {
  input?: Maybe<IFavoriteChannelInput>;
};


export type IMutationSendMessageArgs = {
  input?: Maybe<ISendMessageInput>;
};

export type IUser = {
  id: FieldWrapper<Scalars['ID']>;
  nickname: FieldWrapper<Scalars['String']>;
  avatar: FieldWrapper<Scalars['String']>;
};

export type IChannel = {
  id: FieldWrapper<Scalars['ID']>;
  name: FieldWrapper<Scalars['String']>;
  isFavorite: FieldWrapper<Scalars['Boolean']>;
  messages?: Maybe<Array<FieldWrapper<IMessage>>>;
};

export type ICreateChannelInput = {
  name: Scalars['String'];
};

export type IFavoriteChannelInput = {
  id: Scalars['ID'];
  isFavorite: Scalars['Boolean'];
};

export type IMessage = {
  id: FieldWrapper<Scalars['ID']>;
  type: FieldWrapper<Scalars['String']>;
  createdAt: FieldWrapper<Scalars['String']>;
};

export type ITextMessage = IMessage & {
  id: FieldWrapper<Scalars['ID']>;
  type: FieldWrapper<Scalars['String']>;
  createdAt: FieldWrapper<Scalars['String']>;
  user: FieldWrapper<IUser>;
  message: FieldWrapper<Scalars['String']>;
};

export type ISystemMessage = IMessage & {
  id: FieldWrapper<Scalars['ID']>;
  type: FieldWrapper<Scalars['String']>;
  createdAt: FieldWrapper<Scalars['String']>;
  title: FieldWrapper<Scalars['String']>;
  message: FieldWrapper<Scalars['String']>;
};

export type ISendMessageInput = {
  channelId: Scalars['ID'];
  message: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<IUser>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Channel: ResolverTypeWrapper<IChannel>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateChannelInput: ICreateChannelInput;
  FavoriteChannelInput: IFavoriteChannelInput;
  Message: IResolversTypes['TextMessage'] | IResolversTypes['SystemMessage'];
  TextMessage: ResolverTypeWrapper<ITextMessage>;
  SystemMessage: ResolverTypeWrapper<ISystemMessage>;
  SendMessageInput: ISendMessageInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {};
  Int: Scalars['Int'];
  String: Scalars['String'];
  Subscription: {};
  Mutation: {};
  User: IUser;
  ID: Scalars['ID'];
  Channel: IChannel;
  Boolean: Scalars['Boolean'];
  CreateChannelInput: ICreateChannelInput;
  FavoriteChannelInput: IFavoriteChannelInput;
  Message: IResolversParentTypes['TextMessage'] | IResolversParentTypes['SystemMessage'];
  TextMessage: ITextMessage;
  SystemMessage: ISystemMessage;
  SendMessageInput: ISendMessageInput;
};

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  placeholder?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>;
  me?: Resolver<Maybe<IResolversTypes['User']>, ParentType, ContextType>;
  getChannels?: Resolver<Array<IResolversTypes['Channel']>, ParentType, ContextType>;
  getChannelByID?: Resolver<Maybe<IResolversTypes['Channel']>, ParentType, ContextType, RequireFields<IQueryGetChannelByIdArgs, 'id'>>;
};

export type ISubscriptionResolvers<ContextType = any, ParentType extends IResolversParentTypes['Subscription'] = IResolversParentTypes['Subscription']> = {
  placeholder?: SubscriptionResolver<Maybe<IResolversTypes['Int']>, "placeholder", ParentType, ContextType>;
};

export type IMutationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  placeholder?: Resolver<Maybe<IResolversTypes['Int']>, ParentType, ContextType>;
  createChannel?: Resolver<Maybe<IResolversTypes['Channel']>, ParentType, ContextType, RequireFields<IMutationCreateChannelArgs, never>>;
  favoriteChannel?: Resolver<Maybe<IResolversTypes['Channel']>, ParentType, ContextType, RequireFields<IMutationFavoriteChannelArgs, never>>;
  sendMessage?: Resolver<Maybe<IResolversTypes['Message']>, ParentType, ContextType, RequireFields<IMutationSendMessageArgs, never>>;
};

export type IUserResolvers<ContextType = any, ParentType extends IResolversParentTypes['User'] = IResolversParentTypes['User']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  nickname?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  avatar?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type IChannelResolvers<ContextType = any, ParentType extends IResolversParentTypes['Channel'] = IResolversParentTypes['Channel']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  isFavorite?: Resolver<IResolversTypes['Boolean'], ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<IResolversTypes['Message']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type IMessageResolvers<ContextType = any, ParentType extends IResolversParentTypes['Message'] = IResolversParentTypes['Message']> = {
  __resolveType: TypeResolveFn<'TextMessage' | 'SystemMessage', ParentType, ContextType>;
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
};

export type ITextMessageResolvers<ContextType = any, ParentType extends IResolversParentTypes['TextMessage'] = IResolversParentTypes['TextMessage']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<IResolversTypes['User'], ParentType, ContextType>;
  message?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ISystemMessageResolvers<ContextType = any, ParentType extends IResolversParentTypes['SystemMessage'] = IResolversParentTypes['SystemMessage']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type IResolvers<ContextType = any> = {
  Query?: IQueryResolvers<ContextType>;
  Subscription?: ISubscriptionResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  User?: IUserResolvers<ContextType>;
  Channel?: IChannelResolvers<ContextType>;
  Message?: IMessageResolvers;
  TextMessage?: ITextMessageResolvers<ContextType>;
  SystemMessage?: ISystemMessageResolvers<ContextType>;
};


