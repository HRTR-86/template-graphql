<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\Common\ErrorCode;
use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * エラー内容を取得する
     * @param ErrorCode $errorCode
     * @param Exception $e
     * @return array
     */
    public function getError(
        ErrorCode $errorCode,
        Exception $e,
    ): array {
        return [
            'error' => [
                'code'    => $errorCode->value,
                'title'   => $errorCode->getErrorMessage(),
                'message' => $e->getMessage(),
            ],
        ];
    }
}
