import { HandleNodeProps, HandleNodeResponse } from "../type";

const handleMathOperatorNode = async (handleNodeProps: HandleNodeProps): Promise<HandleNodeResponse> => {
  return { nextSourceHandle: 'output', nodeOutput: null };
}

export default handleMathOperatorNode;
