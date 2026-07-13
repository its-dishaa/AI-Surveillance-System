import logging
import sys

from app.core.config import settings


def setup_logging():
    """
    Configure application-wide logging.
    """

    logging.basicConfig(
        level=getattr(logging, settings.log_level.upper(), logging.INFO),
        format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        handlers=[
            logging.StreamHandler(sys.stdout)
        ],
    )


setup_logging()

logger = logging.getLogger("surveillance")