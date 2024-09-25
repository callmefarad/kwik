export const formatCardNumber = (value: string) => {
	const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
	const matches = v.match(/\d{4,16}/g);
	const match = (matches && matches[0]) || "";
	const parts = [];
	for (let i = 0, len = match.length; i < len; i += 4) {
		parts.push(match.substring(i, i + 4));
	}
	return parts.length ? parts.join(" ") : value;
};

export const formatExpirationDate = (value: string) => {
	const cleanValue = value.replace(/[^\d]/g, "");
	return cleanValue.length <= 4 ? cleanValue.replace(/^(\d{2})/, "$1/") : value;
};
