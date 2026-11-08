import { ForbiddenException } from '@nestjs/common'
import { PropertiesService } from './properties.service.js'

function setup(property: { id: number; ownerId: number; status: string }) {
  const prisma = {
    property: {
      findUnique: vi.fn().mockResolvedValue(property),
      update: vi.fn().mockImplementation(({ data }) => Promise.resolve({ ...property, ...data })),
    },
    category: { findUnique: vi.fn() },
  }
  return { prisma, service: new PropertiesService(prisma as never) }
}

describe('PropertiesService.update', () => {
  it('sends an approved listing back to moderation after the owner edits it', async () => {
    const { prisma, service } = setup({ id: 1, ownerId: 7, status: 'APPROVED' })
    const updated = await service.update(1, 7, { title: 'Yangi sarlavha' })
    expect(prisma.property.update.mock.calls[0][0].data).toEqual({ title: 'Yangi sarlavha', status: 'PENDING' })
    expect(updated.status).toBe('PENDING')
  })

  it('does not let another user edit the listing', async () => {
    const { prisma, service } = setup({ id: 1, ownerId: 7, status: 'APPROVED' })
    await expect(service.update(1, 99, { title: 'x' })).rejects.toBeInstanceOf(ForbiddenException)
    expect(prisma.property.update).not.toHaveBeenCalled()
  })
})
