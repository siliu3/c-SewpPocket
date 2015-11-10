from app import App
from constants.enums import AppMode


if __name__ == "__main__":
    app = App(AppMode.Pro)
    app.run_command()
