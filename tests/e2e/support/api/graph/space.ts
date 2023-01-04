import { checkResponseStatus, request } from '../http'
import { Space, User } from '../../types'
import join from 'join-path'
import { createFolderInsideSpace, getFileId, uploadFileInsideSpace } from '../dav/space'

export const getSpaceIdBySpaceName = async ({
  user,
  spaceType,
  spaceName
}: {
  user: User
  spaceType: string
  spaceName: string
}): Promise<string> => {
  const response = await request({
    method: 'GET',
    path: join('graph', 'v1.0', 'me', 'drives', `?$filter=driveType eq '${spaceType}'`),
    user: user
  })
  checkResponseStatus(response, 'Failed while fetching spaces')
  // search for the space with the space name
  const result = await response.json()
  for (const spaceProject of result.value) {
    if (spaceProject.name === spaceName) {
      return spaceProject.id
    }
  }
  throw new Error(`Space id for the space name ${spaceName} could not be found`)
}

export const createSpace = async ({
  user,
  space
}: {
  user: User
  space: Space
}): Promise<string> => {
  // create a space with this function
  const body = JSON.stringify({
    id: space.id,
    name: space.name
  })

  const response = await request({
    method: 'POST',
    path: join('graph', 'v1.0', 'drives'),
    body,
    user: user
  })

  // to make api request work consistently with UI we need to create a hidden folder '.space'
  // inside .space it consist of files that may be required to update the space (e.g. change description of space (stored by readme.md), change image of space)

  checkResponseStatus(response, 'Failed while creating a space project')

  const result = await response.json()
  const spaceName = result.name
  const spaceId = await getSpaceIdBySpaceName({
    user: user,
    spaceType: 'project',
    spaceName: spaceName
  })
  // api call to make a hidden file when the space creation in successful
  await createFolderInsideSpace({ user, spaceId: spaceId, folderName: '.space' })
  // again make an api call to create a readme.md file so that the edit description is shown in the web UI
  await uploadFileInsideSpace({ user, spaceId: spaceId, fileName: '.space/readme.md' })
  // again make an api call to get file id of the uploaded file `readme.md`
  const fileId = await getFileId({ user, spaceId: spaceId, fileName: '.space/readme.md' })
  // after getting file id make a patch request to update space special section
  await updateSpaceSpecialSection({
    user,
    spaceId: result.id,
    type: 'description',
    fileId: fileId
  })

  return result.id
}

export const updateSpaceSpecialSection = async ({
  user,
  spaceId,
  type,
  fileId
}: {
  user: User
  spaceId: string
  type: string
  fileId: string
}): Promise<void> => {
  if (type === 'description') {
    type = 'readme'
  } else {
    type = 'image'
  }
  const body = JSON.stringify({
    special: [
      {
        specialFolder: {
          name: type
        },
        id: fileId
      }
    ]
  })

  const response = await request({
    method: 'PATCH',
    path: join('graph', 'v1.0', 'drives', spaceId),
    body: body,
    user: user
  })
  checkResponseStatus(
    response,
    `Failed while creating special section "${type}" inside space project`
  )
}
