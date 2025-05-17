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
