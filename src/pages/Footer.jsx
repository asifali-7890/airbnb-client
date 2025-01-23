import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className='bg-pink-500 text-white py-8'>
            <div className="container mx-auto px-6 text-center">
                <h3 className="text-3xl font-semibold mb-4">Connect with Asif Ali</h3>
                <p className="text-lg mb-6">Lets collaborate and create something amazing together!</p>

                <div className="flex justify-center gap-6 mb-8">
                    <a href="https://www.linkedin.com/in/AsifAli1010/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300 transition-all">
                        <FaLinkedin className="w-8 h-8" />
                    </a>
                    <a href="https://github.com/asifali-7890/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300 transition-all">
                        <FaGithub className="w-8 h-8" />
                    </a>
                    <a href="https://www.facebook.com/gufraan.ali.73" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300 transition-all">
                        <FaFacebook className="w-8 h-8" />
                    </a>
                    <a href="https://www.instagram.com/asifali102000/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300 transition-all">
                        <FaInstagram className="w-8 h-8" />
                    </a>
                </div>

                <p className="text-sm">© 2025 Asif Ali. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
