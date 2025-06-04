import { animate, inView } from 'motion';

export function animateIn(element, args = {}) {
	const defaults = {
		duration: 0.5,
		delay: 0.5,
		scale: 1,
		x: 0,
		y: 0,
		blur: 0,
		rotate: 0,
		onView: 0
	};

	const finalArgs = { ...defaults, ...args };

	inView(
		element,
		(element) => {
			animate(
				element,
				{
					opacity: [0, 1],
					scale: [finalArgs.scale, 1],
					x: [finalArgs.x, 0],
					y: [finalArgs.y, 0],
					rotate: [finalArgs.rotate, 0],
					filter: [`blur(${finalArgs.blur}px)`, 'blur(0px)']
				},
				{
					duration: finalArgs.duration,
					delay: finalArgs.delay
				}
			);
		},
		{
			once: true,
			amount: finalArgs.onView
		}
	);
}

export const modelsGoogle = [
	{ value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
	{ value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
	{ value: 'gemini-2.5-pro-preview', label: 'Gemini 2.5 Pro Preview' }
];

export const modelsOpenAI = [
	{ value: 'gpt-4.1', label: 'GPT-4.1' },
	{ value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini' },
	{ value: 'gpt-4o', label: 'GPT-4o' },
	{ value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
	{ value: 'o4-mini', label: 'o4-mini' },
];
