export type dbControllerType<Tvalues, Tmessage> = {
  isSuccess: boolean;
  values: Tvalues;
  messages: Tmessage;
}