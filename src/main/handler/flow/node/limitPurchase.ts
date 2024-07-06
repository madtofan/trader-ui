import { getPositions } from "../../ib";
import { HandleNodeProps, HandleNodeResponse } from "../type";

const handleLimitPurchaseNode = async (handleNodeProps: HandleNodeProps): Promise<HandleNodeResponse> => {
  const { nodeRunnerArgs: { store, mainWindow, getIb } } = handleNodeProps;
  await getPositions(store, mainWindow, getIb)
    .then((result) => console.log(result))
    .catch((err) => {
      throw Error(`${err}`);
    });
  return { nextSourceHandle: 'output', nodeOutput: null };
}

export default handleLimitPurchaseNode;
