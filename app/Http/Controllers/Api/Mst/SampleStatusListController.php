<?php declare(strict_types=1);

namespace App\Http\Controllers\Api\Mst;

use App\Enums\Common\ErrorCode;
use App\Http\Controllers\Controller;
use App\Models\Mst\MstSampleStatus;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class SampleStatusListController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function __invoke(Request $request): JsonResponse
    {
        try {
            $mstRoleList = MstSampleStatus::query()->whereNull('deleted_at')->get();

            return response()->json([
                'mst_sample_status_list' => $mstRoleList->toArray(),
            ]);

        } catch (Exception $e) {
            throw new Exception(
                ErrorCode::ML0202->getErrorMessage(),
                HttpResponse::HTTP_INTERNAL_SERVER_ERROR,
                $e,
            );
        }
    }
}
