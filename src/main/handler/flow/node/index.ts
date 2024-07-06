import { CustomNodeKeys } from '@/lib/config/flow';
import { Node } from 'reactflow';
import handleStartNode from './start';
import handleConstantNode from './constant';
import handleIfConditionNode from './ifCondition';
import handleMathOperatorNode from './mathOperator';
import handleLimitPurchaseNode from './limitPurchase';
import { HandleNodeProps, HandleNodeResponse, NodeRunnerArgs } from '../type';

const nodeHandlerMap = new Map<CustomNodeKeys, (handleNodeProps: HandleNodeProps) => Promise<HandleNodeResponse>>([
  ['start', handleStartNode],
  ['constant', handleConstantNode],
  ['ifCondition', handleIfConditionNode],
  ['mathOperator', handleMathOperatorNode],
  ['limitPurchase', handleLimitPurchaseNode],
]);

class FlowNode {
  type: CustomNodeKeys;
  data: any;
  inputs: { [inputId: string]: FlowNode };
  outputs: { [outputId: string]: FlowNode };
  values: any;

  constructor(currentNode: Node) {
    this.inputs = {};
    this.outputs = {};
    this.type = currentNode.type as CustomNodeKeys;
    this.data = currentNode.data;
  }

  async executeNode(nodeRunnerArgs: NodeRunnerArgs): Promise<FlowNode | null> {
    console.log(`executing node: ${this.type}`);
    const nodeHandler = nodeHandlerMap.get(this.type);
    if (!nodeHandler) throw Error(`Node type ${this.type} not recognized`);
    const nodeResponse = await nodeHandler({ flowNode: this, nodeRunnerArgs });
    this.values = nodeResponse.nodeOutput;
    if (!nodeResponse.nextSourceHandle) return null;
    return this.outputs[nodeResponse.nextSourceHandle];
  }

  async getNodeValue(nodeRunnerArgs: NodeRunnerArgs) {
    if (!this.values) await this.executeNode(nodeRunnerArgs);
    return this.values;
  }

  addOutput(outputId: string, node: FlowNode) {
    this.outputs[outputId] = node;
  }

  addInput(inputId: string, node: FlowNode) {
    this.inputs[inputId] = node;
  }
}

export default FlowNode;
