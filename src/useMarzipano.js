/**
 * MIT License
 *
 * Copyright (c) 2019 BottleTech Limited
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import useViewer from 'useViewer'
import MarzipanoLib from 'marzipano'
import { useScenes } from 'scenes'
import { useHotspots } from 'hotspots'


function useMarzipano(viewerCanvas, props) {
  // Viewer initialization
  const viewer = useViewer(viewerCanvas)

  const { scenes: sceneSpecs, hotspots: hotspotSpecs, onLoad, settings } = props

  if (settings && settings.autorotateEnabled) {
    const autorotate = MarzipanoLib.autorotate({
      yawSpeed: 0.03,         // Yaw rotation speed
      targetPitch: 0,        // Pitch value to converge to
      targetFov: Math.PI/2   // Fov value to converge to
    });
    // Start autorotation immediately
    viewer && viewer.startMovement(autorotate);
  }

  // Scene Loading
  const [scenes, currentScene] = useScenes(viewer, sceneSpecs, onLoad)

  // Hotspot Loading
  const hotspotContainer = currentScene && currentScene.hotspotContainer ? currentScene.hotspotContainer() : null
  const hotspots = useHotspots(hotspotContainer, hotspotSpecs)
}

export default useMarzipano
