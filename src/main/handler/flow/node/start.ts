import { HandleNodeProps, HandleNodeResponse } from "../type";

const handleStartNode = async (handleNodeProps: HandleNodeProps): Promise<HandleNodeResponse> => {
  return { nextSourceHandle: 'output', nodeOutput: null };
}

export default handleStartNode;
