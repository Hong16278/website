"""Local preview with SPA route fallback; not a production server."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
os.chdir(Path(__file__).resolve().parents[1])
class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split('?', 1)[0].split('#', 1)[0]
        if not Path('.' + path).is_file() and not Path('.' + path).is_dir():
            self.path = '/index.html'
        return super().do_GET()
if __name__ == '__main__':
    ThreadingHTTPServer(('127.0.0.1', 8080), Handler).serve_forever()
