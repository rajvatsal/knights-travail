export default function Queue(initNode) {
	if (!initNode) {
		throw new Error("No init node provided to queue");
		return;
	}
	const queue = [initNode];
	const enqueued = [];

	const enqueue = (...nodes) =>
		nodes.forEach((node) => {
			if (node === null) return;
			if (enqueued.find(([x, y]) => x === node[0] && y === node[1])) return;
			enqueued.push(node);
			queue.push(node);
		});
	const dequeue = () => (queue = queue.slice(1));
	const getLength = () => queue.length;
	const getFirst = () => queue[0];

	return { enqueue, dequeue, getLength, getFirst };
}
