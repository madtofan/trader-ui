import { IF_CONDITIONS, IfConditionData } from '../../../../shared-types';
import { HandleNodeProps, HandleNodeResponse } from '../type';

const handleIfConditionNode = async (handleNodeProps: HandleNodeProps): Promise<HandleNodeResponse> => {
  const { flowNode, nodeRunnerArgs } = handleNodeProps;
  const currentNodeData: IfConditionData = flowNode.data;
  const firstValue = await flowNode.inputs['input-1']?.getNodeValue(nodeRunnerArgs);
  const secondValue = await flowNode.inputs['input-2']?.getNodeValue(nodeRunnerArgs);
  if (!firstValue || !secondValue) throw Error(`IfConditionInputIsInvalid`);
  switch (currentNodeData.condition) {
    case IF_CONDITIONS.LargerThan:
      return { nextSourceHandle: firstValue > secondValue ? 'then' : 'else', nodeOutput: null };
    case IF_CONDITIONS.LargerThanEqual:
      return { nextSourceHandle: firstValue >= secondValue ? 'then' : 'else', nodeOutput: null };
    case IF_CONDITIONS.Equal:
      return { nextSourceHandle: firstValue === secondValue ? 'then' : 'else', nodeOutput: null };
    case IF_CONDITIONS.Contains:
      return { nextSourceHandle: String(firstValue).includes(String(secondValue)) ? 'then' : 'else', nodeOutput: null };
    default:
      throw Error(`ifCondition consition ${currentNodeData.condition} not recognized`);
  }
}

export default handleIfConditionNode;
