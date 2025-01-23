// eslint-disable-next-line react/prop-types
export default function Image({ src, ...rest }) {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    src = src && src.includes('https://') ? src : `${baseURL}uploads/${src}`;
    return (
        <img {...rest} src={src} alt="" />
    );
}
