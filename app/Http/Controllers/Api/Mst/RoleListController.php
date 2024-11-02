<?php declare(strict_types=1);

namespace App\Http\Controllers\Api\Mst;

use App\Enums\Common\ErrorCode;
use App\Http\Controllers\Controller;
use App\Models\Mst\MstRole;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class RoleListController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function __invoke(Request $request): JsonResponse
    {
        try {
            $mstRoleList = MstRole::query()->whereNull('deleted_at')->get();

            return response()->json([
                'mst_role_list' => $mstRoleList->toArray(),
            ]);

        } catch (Exception $e) {
            throw new Exception(
                ErrorCode::ML0201->getErrorMessage(),
                HttpResponse::HTTP_INTERNAL_SERVER_ERROR,
                $e,
            );
        }
    }
}
