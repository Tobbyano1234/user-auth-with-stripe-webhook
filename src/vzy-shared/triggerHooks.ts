import { match } from "ts-pattern";

type DataResponse = {
  success: boolean;
  message: string;
  data: any;
  hookData: any;
};

export const triggerSuccessFailureHooks = (
  DataResponse: DataResponse,
  onSuccess: (...args: any[]) => any,
  onFailure = (...args: any[]) => {}
) =>
  match(DataResponse)
    .with({ success: true }, ({ hookData }) => onSuccess(hookData))
    .with({ success: false }, ({ hookData }) => onFailure(hookData))
    .run();
