import { HandleNodeProps, HandleNodeResponse } from "../type";

const handleConstantNode = async (handleNodeProps: HandleNodeProps): Promise<HandleNodeResponse> => {
  return { nextSourceHandle: 'output', nodeOutput: handleNodeProps.flowNode.data.value || null };
}

export default handleConstantNode;
