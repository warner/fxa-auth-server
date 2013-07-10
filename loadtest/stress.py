"""
Load test for the picl-idp server
"""

import os
import base64
import random
import time

from loads import TestCase


class StressTest(TestCase):

    server_url = "https://idp.profileinthecloud.net"

    def test_entropy(self):
        response = self.app.get("/entropy", status=[200])
        assert "data" in response.json
