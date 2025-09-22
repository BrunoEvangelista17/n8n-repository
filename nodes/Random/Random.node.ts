import {
	INodeType,
	INodeTypeDescription,
	IExecuteFunctions,
	INodeExecutionData,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:Random.svg', // Referencia o ícone na mesma pasta
		group: ['transform'],
		version: 1,
		subtitle: '=True Random Number Generator',
		description: 'Gera um número aleatório utilizando a API da Random.org',
		defaults: {
			name: 'Random Number',
		},
		inputs: ['main' as NodeConnectionType],
		outputs: ['main' as NodeConnectionType],
		properties: [
			// Define a única operação disponível neste node
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'True Random Number Generator',
						value: 'generate',
						action: 'Gera um n mero aleat rio',
					},
				],
				default: 'generate',
			},
			// Input para o valor mínimo (Min)
			{
				displayName: 'Min',
				name: 'minValue',
				type: 'number',
				default: 1,
				required: true,
				displayOptions: {
					show: {
						operation: ['generate'],
					},
				},
				description: 'O valor mínimo do intervalo (inclusivo)',
			},
			// Input para o valor máximo (Max)
			{
				displayName: 'Max',
				name: 'maxValue',
				type: 'number',
				default: 100,
				required: true,
				displayOptions: {
					show: {
						operation: ['generate'],
					},
				},
				description: 'O valor máximo do intervalo (inclusivo)',
			},
		],
	};

	// Método que será executado quando o node for ativado
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// Itera sobre cada item que chega ao node (normalmente, apenas 1)
		for (let i = 0; i < items.length; i++) {
			const minValue = this.getNodeParameter('minValue', i) as number;
			const maxValue = this.getNodeParameter('maxValue', i) as number;

			// Validação de segurança para garantir que min <= max
			if (minValue > maxValue) {
				throw new NodeOperationError(
					this.getNode(),
					'O valor de "Min" não pode ser maior que o de "Max".',
					{ itemIndex: i },
				);
			}

			// Monta a URL da API do Random.org dinamicamente
			const url = `https://www.random.org/integers/?num=1&min=${minValue}&max=${maxValue}&col=1&base=10&format=plain&rnd=new`;

			// Faz a requisição GET usando o helper do n8n (melhor prática)
			const response = await this.helpers.httpRequest({
				method: 'GET',
				url: url,
				json: false, // A resposta é texto puro
			});

			// A API retorna o número como uma string com uma quebra de linha.
			// Limpamos a string e a convertemos para um número.
			const randomNumber = parseInt(response.toString().trim(), 10);

			// Clona o JSON do item de entrada e adiciona o novo campo com o número aleatório
			const newItem: INodeExecutionData = {
				json: {
					...items[i].json,
					randomNumber: randomNumber,
				},
			};

			returnData.push(newItem);
		}

		// Retorna os dados para o próximo node no workflow
		return [returnData];
	}
}
